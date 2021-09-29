//cargar imagenes
const fs = require('fs');
const path = require('path');

exports.fileUpload = async function (file, namePath){
    try {
        
        //metodo match
        //img Base 64
        //console.log('THIS IS FILE DE LOS PARAMS \n',file);
        let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/); //expresion regular para identiicar una imagen en base 64
        let response = {};

        //console.log('THIS IS MATCHES \n',matches);

        if(matches.length !== 3) return new Error (`Strinf invalido`);

        response.type = matches[1];
        response.data = Buffer.from(matches[2],'base64');
        let imageBuffer =  response.data;

        //console.log('Esto es la imagen a guardar \n',imageBuffer);

        //fs files sistem
        if(!fs.existsSync(`${path.dirname(require.main.filename)}/public${namePath}`)
        ) {
            //ruta estatica 
            //'escritorio/development/clase1/public',
            fs.mkdirSync(`${path.dirname(require.main.filename)}/public${namePath}`, //ruta diamica
            true
            );
        }

        let extension = response.type.split('/');
        let fileName = `${Date.now()}.${extension[1]}`;
        let fileRoute = `${namePath}/${fileName}`;  //ruta de la imagen 

        //crear la ruta de la imagen dentro del servidor
        fs.writeFileSync(
            `${path.dirname(require.main.filename)}/public${fileRoute}`,
            imageBuffer,
            "utf-8"
        );

        return fileRoute;

    } catch (error) {
        return new Error ('Error servidor');
    }      
};