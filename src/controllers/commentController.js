const primsa = require("../util/db")



//get comments
async function getComments(req,res){

    const postID = Number(req.params.id)

    try {

    const comments = await prisma.comment.findMany({

        where:{postID,status:"VISIBLE"},
        orderBy: {createdBy: "desc"},
        include: {
            author: {select: {id:true,username:true,email:true}}
        },
    })
    res.json(comments)
    }catch(err){

        res.status(500).json({error:"failed to retrive comments"})

    }

}
//post comments
async function createComment(req,res){


    const postID = Number(req.params.id)

    const {body,guestName,guestEmail} = req.body

    if (!body){

        return res.staus(500).json({error:"comment body cannot be empty"})


    }


    try {
    
        let data = {

            body,
            postID

        };

        if (req.user){
            data.authorId = req.user.id
        }else{

        if(!guestName || !guestEmail){
            return res.staus(500).json({error:"need guest email & guest name"})

        }
        data.guestName = guestName
        data.guestEmail = guestEmail



        }

        const comment = prisma.comment.create({data});
        res.json(comment)


    }catch(err){

        return res.staus(500).json({error:"failed to create comment"})

    }

}

async function updateComment(req,res){

    const id = Number(req.params.id);

    const body = req.body.body 


    try {

        const exisitng = await prisma.comment.findUnique({where:{id}})

        if(!exisitng){

            return res.status.json({error:"couldn't find comment"})

        }



        const isOwner = exisitng.authorId === req.user.id; // add a question mark

        const isAdmin = req.user.role === "ADMIN";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "Forbidden" });
        }



        const updated = prisma.comment.update({

            where:{id},
            data:{body}
        })



    }catch(err){


    }



async function deleteComment(req,res){


    const id = Number(req.params.id);


    try {

        const existing = await prisma.comment.findUnique({where:{id}})

        if(!existing){

            res.status(500).json({error:"unable to find the comment"})


        }

        const isOwner = req.user.id === existing.authorId;
        const isAdmin = req.user.role === "ADMIN"


        if (!isAdmin && !isOwner){

            res.status(500).json({error:"unauthorized req"})


        }

        const del = await prisma.comment.delete({where:{id}})

        res.json({message:"comment deleted"})


    }catch(err){


        console.log(err)
        res.status(500).json({error:"unable to delete the comment"})

    }
    
}}


module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComments,
};