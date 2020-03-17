const fs = require('fs');
const path = require('path');
module.exports = class ProductService{

    static convertToBase64(image){
        let buff = fs.readFileSync(image);
        let base64data = buff.toString('base64');
        return base64data;
    } 

    static converterToImage(base64Arr){
        let pNum = 0, prdArr=[];
        for(let temp of base64Arr){
            let buff1 = new Buffer.from(temp.image, 'base64');
            let count = pNum++; 
            fs.writeFileSync('./public/image/'+'img'+ count+'.png', buff1, {encoding:"base64"},function(e){
                if(e){
                    console.log(e);
                }else{
                    console.log("image converted! ")
                }
            });  
            temp.image = '/image/'+'img'+ count+'.png';
            prdArr.push(temp);
        }
        return prdArr;
    }

    static clearFolder(){
        //console.log(path.join(__dirname, 'public/image'));
        const directory = './public/image';
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
          });
    }

}