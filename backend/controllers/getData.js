const userSchema = require("../model/user-model");

const getData = async (req,res)=>{
    try{
        userSchema.find({}, { _id: 0, __v: 0 }).then((rslt) => {
            return res.status(200).send(rslt);
          });

    }catch(err)
    {
        console.log(err);
    }
}
exports.getData = getData