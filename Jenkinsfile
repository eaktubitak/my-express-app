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
        /*
        stage('Build') {
            steps {
                // TypeScript dosyalarını derler
                sh 'npm run build'
            }
        }
        */
        stage('Test') {
            steps {
                // Testleri çalıştırır
                sh 'npm test'
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
