const express=require("express");
//引入路由器文件
const carRouter=require("./routes/car");
var app=express();
app.listen(3000,function(){
    console.log("服务器创建成功");
});
app.use(express.static("static"));
//挂在路由器
app.use("/car",carRouter);