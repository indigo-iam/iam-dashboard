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
        sh 'node --version'
      }
    }
  }
}
