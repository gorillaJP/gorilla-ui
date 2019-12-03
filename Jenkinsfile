pipeline {
  agent {
    node {
      label 'node12'
    }
  }
  parameters {
    gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH', type: 'PT_BRANCH'
  }
  stages {

    stage('Build') {
      steps {
        sh '''whoami
/usr/local/bin/docker-compose up --build -d'''
      }
    }
  }
  triggers {
    githubPush()
  }
}