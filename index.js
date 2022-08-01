const express = require('express');
const {readdir , stat} = require("fs/promises");
const {join} = require("path");
// 加载我们的rust module
const rustmodule = require("./dist/index")
const app = express();
const port = 3000;

const dirSize = async dir =>{
    const files = await readdir(dir,{withFileTypes:true})
    const paths = files.map( async file =>{
       const path = join(dir, file.name)
        if (file.isDirectory()) {
            return await dirSize(path)
        }
        if (file.isFile()){
            const {size } = await stat(path)
            return size
        }
       return 0
    })
    return (await Promise.all(paths)).flat(Infinity).reduce((i,size) => i+ size , 0)

}
app.get("/v1" , async (req,res)=>{
    console.time("dir")
    let size = await dirSize("./assets/")
    console.timeEnd('dir')
    res.json(size)
})
app.get("/v2", async (req,res) =>{
    console.time("dir")
    let size = await rustmodule.size("./assets/")
    console.timeEnd("dir")
    res.json({size:Number(size)})
})
app.listen(port, () => {
    console.log(`服务监听在${port}`)
})