# CryptoBank
CryptoBank es una aplicación web que muestra una lista de cuentas con sus saldos y balances disponibles en BTC (bitcoin) y su equivalente en dólares. CryptoBank utiliza tecnologías de vanguardia como Angular y NestJS. CryptoBank pretende ser una solución innovadora y disruptiva para el sector financiero, ofreciendo a sus clientes una alternativa más accesible, flexible y rentable que los bancos tradicionales.
# Características principales
- CryptoBank actualiza el tipo de cambio entre BTC y dólar cada 30 segundos mediante websockets, enviando un valor aleatorio pero realista (por ejemplo, entre $5000 y $12000). El tipo de cambio actual se muestra en la pantalla y se utiliza para calcular el saldo y el balance disponible de cada cuenta tanto en BTC como en dólares.
![image](https://github.com/vladern/crypto-bank/assets/17649603/75004975-0f3c-4deb-821e-6b7a11f0c2ac)

- CryptoBank simula cambios en el saldo y el balance disponible de las cuentas cada 20 a 40 segundos, enviando una actualización al frontend mediante websockets. El cambio se resalta con un color de fondo rojo o verde según si el balance disponible ha disminuido o aumentado respectivamente.
- CryptoBank implementa una funcionalidad de maestro/detalle, permitiendo al usuario hacer clic en una cuenta para ver sus detalles en una nueva página dentro de la misma aplicación. La página de detalles muestra una tabla con las transacciones que pertenecen a la cuenta seleccionada, mostrando el código de orden, el id de orden, el débito, el crédito y el balance tanto en BTC como en dólares. El balance se recalcula cada vez que se recibe un nuevo tipo de cambio.
![image](https://github.com/vladern/crypto-bank/assets/17649603/613e1c99-33b3-4704-9d4f-2462e18cb04a)

# Requisitos
Para ejecutar este proyecto, necesitas tener instalado Node.js y yarn en tu sistema.

## Instalación
Para instalar las dependencias de ambos proyectos, tienes que seguir estos pasos:

- Abre una consola y navega hasta la carpeta de backend con el comando `cd backend`.
- Ejecuta el comando `yarn` para instalar las dependencias del proyecto de backend.
- Abre otra consola nueva.
- Navega hasta la carpeta de frontend con el comando `cd frontend`.
- Ejecuta el comando `yarn` para instalar las dependencias del proyecto de frontend.
## Ejecución
Para ejecutar ambos proyectos en modo desarrollo, tienes que seguir estos pasos:

- Abre una consola y navega hasta la carpeta de backend con el comando `cd backend`.
- Ejecuta el comando `yarn start` para ejecutar el proyecto de backend.
- Cierra la consola y abre otra nueva.
- Navega hasta la carpeta de frontend con el comando `cd frontend`.
- Ejecuta el comando `yarn start` para ejecutar el proyecto de frontend.
- Estos comandos iniciarán los proyectos de backend y frontend en puertos diferentes, por lo que podrás acceder a ellos desde el navegador. Por defecto, el proyecto de backend se ejecutará en el puerto 3001 y el proyecto de frontend se ejecutará en el puerto 4200.
