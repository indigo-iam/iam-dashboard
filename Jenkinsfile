pipeline {
  agent { 
     docker { 
      image 'node:20-alpine'
      label 'docker'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }
  }
}
