# Instrucciones para correr el proyecto por primera vez

## Descargando el proyecto de GitHub

- Abre una terminal de Git Bash en el directorio donde deseas guardar el proyecto y realiza el comando

        git clone git@github.com:JorgeToAn/Indices.git

## Backend

- Asegurate de tener [python](https://www.python.org/) instalado en tu máquina y continua con los siguientes pasos.

- Abre una terminal de powershell o cmd dentro de la carpeta "backend".

- Crea un entorno virtual **(venv)** para python.

        python -m venv venv

- Activa el venv utilizando el siguiente comando

        venv\Scripts\activate

    Si obtienes un error como el siguiente

        venv\Scripts\activate : The module 'venv' could not be loaded. For more information, run 'Import-Module venv'...

    Corre este comando primero y después vuelve a intentar correr el primer comando

        Set-ExecutionPolicy Unrestricted -Scope Process

- Para saber si el venv se activó, verifica que tu línea en terminal comienza con `(venv)`.

- Ahora debes de descargar los requerimientos del proyecto con el comando

        pip install -r requirements.txt

- Genera una llave secreta para el proyecto en la siguiente página **[djecrety](https://djecrety.ir/)**, la necesitas para el siguiente paso.

- Una vez que se hayan instalado correctamente, crea un archivo en la raíz del directorio "backend" que se llame ".env" que contenga la siguiente estructura

        SECRET_KEY=**la llave que generaste aquí**
        DEBUG=TRUE

- Corre las migraciones de django para la base de datos realizando los dos siguientes comandos

        python manage.py makemigrations
        python manage.py migrate

- Crea un superusuario para acceder a todos los permisos de la aplicación

        python manage.py createsuperuser

    Te pedirá unos datos para crearlo, realmente no importa que ingreses pero recuerda el nombre de usuario, email y contraseña para acceder a la aplicación.

- Finalmente corre el backend con el comando

        python manage.py runserver

    Verás un mensaje de que el servidor está corriendo en servidor local [localhost:8000](http:localhost:8000). Cuando necesites detener el servidor utiliza `CTRL+C` dentro de la terminal, por el momento dejalo corriendo.

## Frontend

- Asegurate de tener [node.js](https://nodejs.org/es) y npm instalado en tu máquina y continua con los siguientes pasos.

- Abre una terminal nueva dentro de la carpeta "frontend".

- Realiza el siguiente comando para instalar las dependencias del proyecto

        npm install

- Una vez que se hayan instalado puedes correr el proyecto utilizando

        npm run dev

    Podras acceder al proyecto en [localhost:3000](http://localhost:3000).

- Inicia sesión con tu superusuario en la ruta [localhost:3000/iniciar-sesion](http://localhost:3000/iniciar-sesion), si tus datos son correctos y el backend funciona correctamente serás llevado a la ruta principal.

- ¡Felicidades! Para encontrar otras guías y más información del proyecto por favor revisa [confluence](https://tostado-itm.atlassian.net/wiki/spaces/SD/overview).
