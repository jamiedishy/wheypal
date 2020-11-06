build: 
	docker build -t eecs4314prismbreak/wheypal-frontend .

run:
	docker run -it -p 80:80 --rm --name wheypal-frontend eecs4314prismbreak/wheypal-frontend:latest