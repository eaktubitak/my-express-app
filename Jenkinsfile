pipeline{
    agent{
        label 'docker-agent'
    }

    stages{
        stage("Welcome"){
            steps{
                sh "pwd"
                sh "ls"
            }
        }
    }

    post {
        always {
            script {
                // Pipeline tamamlandığında workspace'i temizler
                deleteDir() 
            }
        }
    }

}
