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
        stage('Dockerhub Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }
        stage('Build and Push Docker Image && Update Version') {
            steps {
                script {
                    def version 
                    // Jenkins'in "built-in" node'unda version.txt dosyasını okuma ve yazma işlemleri
                    node('built-in') {
                        def versionFile = '/var/jenkins_home/version.txt'
                        version = readFile(versionFile).trim().toInteger()
                        // Versiyon bilgisini artırma
                        writeFile file: versionFile, text: "${version + 1}"
                    }
                    // Docker build işlemini 'docker-agent' üzerinde gerçekleştirme
                    sh "docker build -t my-express-app:${version} ."
                    sh "docker tag my-express-app:${version} eaydinkurubacak/my-express-app:latest"

                    // Docker push
                    sh "docker push eaydinkurubacak/my-express-app:${version}"
                    sh "docker push eaydinkurubacak/my-express-app:latest"
                }
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
