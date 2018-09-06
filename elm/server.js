const express = require('express');
const data = require('./data.json');
const app = express();

const apiRouter = express.Router();

apiRouter.get('/seller',(req,res)=>{
    res.json({
        success: true,
        data: data.seller
    })
});

apiRouter.get('/goods',(req,res)=>{
    res.json({
        success: true,
        data: data.goods
    })
});

apiRouter.get('/ratings',(req,res)=>{
    res.json({
        success: true,
        data: data.ratings
    })
});

app.use('/api',apiRouter);

app.listen(8000,()=>{
    console.log('listen: 8000');
});
