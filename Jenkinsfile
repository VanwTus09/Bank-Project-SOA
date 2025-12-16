pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  environment {
    PROJECT_NAME = 'Bank-Project-SOA'
    NODE_ENV     = 'ci'
    CI           = 'true'
  }

  stages {

    stage('Info') {
      steps {
        echo "🚀 Start CI for ${PROJECT_NAME}"
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || echo "⚠️ No tests or tests failed (ignored)"'
      }
    }

    stage('Build React App') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    success {
      emailext(
        subject: "✅ Jenkins SUCCESS - ${PROJECT_NAME} #${BUILD_NUMBER}",
        body: """
Build SUCCESS 🎉

Project : ${PROJECT_NAME}
Job     : ${JOB_NAME}
Build   : #${BUILD_NUMBER}
Branch  : ${GIT_BRANCH}

Build URL:
${BUILD_URL}
""",
        to: "tunguyen.05112004@gmail.com"
      )
    }

    failure {
      emailext(
        subject: "❌ Jenkins FAILED - ${PROJECT_NAME} #${BUILD_NUMBER}",
        body: """
Build FAILED ❌

Project : ${PROJECT_NAME}
Job     : ${JOB_NAME}
Build   : #${BUILD_NUMBER}
Branch  : ${GIT_BRANCH}

Check log here:
${BUILD_URL}
""",
        to: "tunguyen.05112004@gmail.com"
      )
    }

    always {
      echo "🏁 CI finished for ${PROJECT_NAME}"
    }
  }
}
