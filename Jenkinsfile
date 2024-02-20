pipeline {
  agent { 
    label 'docker'
    docker { image 'node:20-alpine' }
  }

  stages {
    stage('Build')
      steps {
        sh 'node --version'
      }
  }
}
