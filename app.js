const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hello readers- Welcome to my blog! If you enjoy news, lifestyle and the marketing world, you are in the right place. I cannot wait to explore the myriad of ways social media can influence these markets through websites, new techniques, bloggers, demographics and so much more.I will be posting daily news-related stuffs. Stay tuned! Happy Reading :)";
const aboutContent = "Hii, I'm Chhavi Jangid, a student by day and a Blogger by night. I love reading, journaling, and finding new Cafe spots to soak up the ambience. I strive to inspire people to read, write, and live a mindful lifestyle.";
const contactContent = "Feel free to contact me at chhavijangid2000@gmail.com ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Chhavi:iitcj..@cluster0.mkwb0.mongodb.net/blogDB",{useNewUrlParser: true});
mongoose.Promise=global.Promise;

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Posts", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port=process.env.PORT;
if(port==null||port=="")
{
  port=3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
