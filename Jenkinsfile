pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  options {
        timestamps()
        ansiColor('xterm')
        timeout(time: 20, unit: 'MINUTES')
  }

  environment {
        // Docker Hub Info
        REGISTRY_URL     = 'vantus123/bank-jdo'
        REGISTRY_CRED_ID = 'dockerhub_registry' 
        
        IMAGE_TAG        = "${REGISTRY_URL}:${env.BUILD_NUMBER}"
        LATEST_TAG       = "${REGISTRY_URL}:latest"

        // Server Info
        APP_NAME    = 'bank-jdo'
        APP_DIR     = '/home/deploy/bank-soa'
        VM_USER     = 'deploy'
        VM_HOST     = '192.168.2.37' 
        VM_PORT     = '22'
        SSH_CRED_ID = 'vm-ssh'
  }
  stages {
        stage('Checkout') {
            steps {
                echo '📥 Checkout source code'
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    echo '🏗️ Building Docker Image...'
                    docker.withRegistry('', REGISTRY_CRED_ID) {
                        // Build Image
                        def appImage = docker.build(IMAGE_TAG)
                        
                        echo '🚀 Pushing Image to Docker Hub...'
                        appImage.push()          
                        appImage.push('latest')  
                    }
                }
            }
        }

        stage('Deploy to VM') {
            steps {
                echo '🚀 Deploying to VM...'
                sshagent([SSH_CRED_ID]) {
                    withCredentials([usernamePassword(credentialsId: REGISTRY_CRED_ID, usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no -p ${VM_PORT} ${VM_USER}@${VM_HOST} '
                                set -e
                                
                                # 1. Tạo thư mục nếu chưa có (để chứa file .env nếu cần scp sau này)
                                mkdir -p ${APP_DIR}

                                # 2. Login Docker
                                echo "${REG_PASS}" | docker login -u "${REG_USER}" --password-stdin

                                # 3. Pull Image
                                echo "⬇️ Pulling latest image..."
                                docker pull ${IMAGE_TAG}

                                # 4. Stop Container cũ
                                echo "🛑 Stopping old container..."
                                docker stop ${APP_NAME} || true
                                docker rm ${APP_NAME} || true

                                # 5. Chạy Container mới
                                echo "▶️ Starting new container..."
                                
                                # Kiểm tra xem file .env có tồn tại không để tránh lỗi
                                if [ ! -f ${APP_DIR}/.env ]; then
                                   echo "⚠️ WARNING: File .env không tồn tại tại ${APP_DIR}!"
                                   echo "Container có thể bị lỗi khi khởi động."
                                fi

                                docker run -d \\
                                  --name ${APP_NAME} \\
                                  --restart unless-stopped \\
                                  -p 4173:4173 \\
                                  --add-host=host.docker.internal:host-gateway \\
                                  --env-file ${APP_DIR}/.env \\
                                  ${IMAGE_TAG}

                                # 6. Dọn dẹp
                                echo "🧹 Cleaning up old images..."
                                docker image prune -f
                            '
                        """
                    }
                }
            }
        }
    }

 // ... post block giữ nguyên ...
    post {
        success {
            script {
                sendTelegram("✅", "DEPLOY SUCCESS (Docker Hub)")
            }
        }
        failure {
            script {
                sendTelegram("❌", "DEPLOY FAILED")
            }
        }
    }
}
// ... hàm sendTelegram giữ nguyên ...
def sendTelegram(String statusEmoji, String statusText) {
  // ... Code Telegram cũ của bạn ...
  withCredentials([
    string(credentialsId: 'TELEGRAM_BOT_TOKEN', variable: 'BOT_TOKEN'),
    string(credentialsId: 'TELEGRAM_CHAT_ID', variable: 'CHAT_ID')
  ]) {
    
    def jenkinsUrl = env.JENKINS_URL ?: "http://192.168.2.37:8080/"
    if (!jenkinsUrl.endsWith("/")) jenkinsUrl += "/"
    def buildLink = "${jenkinsUrl}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/console"

    sh """#!/bin/bash
      set -e
      
      COMMIT_SHORT=\$(git rev-parse --short HEAD 2>/dev/null || echo "N/A")
      COMMIT_MSG=\$(git log -1 --pretty=%s 2>/dev/null || echo "N/A")
      COMMIT_AUTHOR=\$(git log -1 --pretty=%an 2>/dev/null || echo "N/A")
      RAW_BRANCH="${env.GIT_BRANCH}"
      BRANCH_NAME=\$(echo "\$RAW_BRANCH" | sed 's|origin/||g')
      
      if [ -z "\$BRANCH_NAME" ] || [ "\$BRANCH_NAME" = "null" ]; then
         BRANCH_NAME=\$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "HEAD")
      fi

      BUILD_TIME=\$(date "+%H:%M:%S %d/%m/%Y")

      MESSAGE="
<b>${statusEmoji} ${statusText}</b>
➖➖➖➖➖➖➖➖➖➖➖
📂 <b>Project:</b> <code>${env.JOB_NAME}</code>

🌿 <b>Branch:</b> <code>\$BRANCH_NAME</code>

👤 <b>Author:</b> <code>\$COMMIT_AUTHOR</code>

⏰ <b>Time:</b> <code>\$BUILD_TIME</code>

📝 <b>Commit:</b> <code>\$COMMIT_SHORT</code>

➖➖➖➖➖➖➖➖➖➖➖
💬 <b>Message:</b>
<i>\$COMMIT_MSG</i>

🔗 <a href=\\"${buildLink}\\">👉 View Console Output</a>
"
      
      curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d chat_id="${CHAT_ID}" \
        -d parse_mode=HTML \
        -d disable_web_page_preview=true \
        --data-urlencode text="\$MESSAGE"
    """
  }
}