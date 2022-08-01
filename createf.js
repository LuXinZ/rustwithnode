let fs = require("fs")
// 创建400个文件夹
let createFile = (path,num) =>{
        if (num < 0){
            return ;
        }
        let r = Math.random() * 10
        fs.mkdir(`${path}/${r}`,()=>{

            for (let j = 0; j < 10; j++) {
                fs.writeFile(`${path}/${r}/${Math.random()}.txt`, Math.random().toString(),'utf8', (err)=>{
                } )
            }

        })
        createFile(`${path}/${r}`, num - 1)
}
let i = 0
while (i < 400){

    createFile("./assets",3)
    i++
}
