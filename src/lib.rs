use node_bindgen::derive::node_bindgen;
use std::{fs, io , path::PathBuf};

fn get_size (path: impl Into<PathBuf>) -> io::Result<u64>{
   fn dir_size (mut dir: fs::ReadDir) -> io::Result<u64>{
        dir.try_fold(0 , |acc, file | {
            let file = file?;
            let size = match file.metadata()? {
                data if data.is_dir() => dir_size(fs::read_dir(file.path())?)?,
                data => data.len(),
            };
            Ok(acc+size )
        })

   }
    dir_size(fs::read_dir(path.into())?)
}
#[node_bindgen]
async fn size(path :String) -> u64 {
   if let Ok(dir_size) =   get_size(path){
       return dir_size;
   }
    else{
        return  0;
    }
}