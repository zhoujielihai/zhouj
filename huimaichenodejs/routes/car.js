const express=require("express");
const pool=require("../pool");
//创建路由器
var router=express.Router();
router.get("/caradd",function(req,res){
    var cname=req.query.cname;
    var price=req.query.price;
    var pic=req.query.pic;
    var tid=req.query.tid;
    if(!cname){
        res.send({code:-1,msg:"名称不能为空"});
        return;
    }
    pool.query("insert into car values(null,?,?,?,?)",[cname,price,pic,tid],function(err,result){
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:200,msg:"插入成功"});
        }else{
            res.send({"code":-2,msg:"插入失败"});
        }
    })
})
router.get("/carlist",function(req,res){
    var tid=req.query.tid;
    pool.query("select * from car where tid=?",[tid],(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    })
})
router.get("/cardel",function(req,res){
    var cid=req.query.cid;
    pool.query("delete from car where cid=?",[cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'删除成功'})
        }else{
            res.send({code:401,msg:'删除失败'})            
        }
    })
})
router.get("/cardetail",function(req,res){
    var cid=req.query.cid;
    pool.query("select * from car where cid=?",[cid],(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
    })
})
module.exports=router;