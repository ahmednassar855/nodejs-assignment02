// Create two arrays (user array, post array)
const userArr = [
      { id: 1, name: "ahmed", age: 37, email: "ahmed@gmail.com" },
      { id: 2, name: "aly", age: 37, email: "aly@gmail.com" },
      { id: 3, name: "mahmoud", age: 37, email: "mahmoud@gmail.com" },
      { id: 4, name: "amr", age: 37, email: "amr@gmail.com" },
      { id: 5, name: "engy", age: 37, email: "engy@gmail.com" },
      { id: 6, name: "body", age: 37, email: "body@gmail.com" }
];

const postArr = [
      { id: 1, userEmail: "ahmed@gmail.com", postedBy: "ahmed", post: " lorem ahmed  ahmed ahmed ahmed ahmed ahmed ahmed " },
      { id: 2, userEmail: "ahmed@gmail.com", postedBy: "ahmed", post: " lorem ahmed  ahmed ahmed ahmed ahmed ahmed ahmed " },
      { id: 3, userEmail: "ahmed@gmail.com", postedBy: "ahmed", post: " lorem ahmed  ahmed ahmed ahmed ahmed ahmed ahmed " },
      { id: 4, userEmail: "aly@gmail.com", postedBy: "aly", post: " lorem aly  aly aly aly aly aly aly " },
      { id: 5, userEmail: "aly@gmail.com", postedBy: "aly", post: " lorem aly  aly aly aly aly aly aly  " },
      { id: 6, userEmail: "aly@gmail.com", postedBy: "aly", post: " lorem aly  aly aly aly aly aly aly " },
      { id: 7, userEmail: "engy@gmail.com", postedBy: "engy", post: " engy engy  engy engy engy engy engy engy " },
      { id: 8, userEmail: "engy@gmail.com", postedBy: "engy", post: " engy ngy engy  engy engy engy engy engy engy " },
      { id: 9, userEmail: "body@gmail.com", postedBy: "body", post: " lorem body  vbody body body body body body " },
      { id: 10, userEmail: "body@gmail.com", postedBy: "body", post: " body body  body body body body body body " },
      { id: 11, userEmail: "ahmed@gmail.com", postedBy: "ahmed", post: " lorem ahmed  ahmed ahmed ahmed ahmed ahmed ahmed " },
      { id: 12, userEmail: "engy@gmail.com", postedBy: "engy", post: " engy ngy engy  engy engy engy engy engy engy " },
      { id: 13, userEmail: "engy@gmail.com", postedBy: "engy", post: " engy ngy engy  engy engy engy engy engy engy " },
      { id: 14, userEmail: "aly@gmail.com", postedBy: "aly", post: " lorem aly  aly aly aly aly aly aly  " },
      { id: 15, userEmail: "aly@gmail.com", postedBy: "aly", post: " lorem aly  aly aly aly aly aly aly " },
      { id: 16, userEmail: "body@gmail.com", postedBy: "body", post: " lorem body  vbody body body body body body " },
];




const express = require('express');

const app = express();


app.get('/users', (req, res) => {
      res.json(userArr);
})


// add new user
app.post('/addUser', express.json(), (req, res) => {
      let emailIsExist = userArr.findIndex((el) => el.email === req.body.email);

      if (emailIsExist) {
            res.json({ message: " This email is already exist try another one", data: req.body.email })
      }
      else {
            userArr.push(req.body);
            res.json({ message: " user add", data: req.body })
      }

})

// delet user

app.delete('/deleteUser', express.json(), (req, res) => {
      let { email } = req.body;
      let getIndexOfThisEmail = userArr.findIndex((el) => el.email === email);
      if (getIndexOfThisEmail < 0) {
            res.json({ message: "user email does not exist", data: email });
      } else {
            userArr.splice(getIndexOfThisEmail, 1);
            // delete userArr[indexOfEmail];
            res.json({ message: " deleted user successfully ", data: userArr });
      }
})

app.put('/user/updateUser', express.json(), (req, res) => {
      let { name, age, email } = req.body;
      let indexOfEmail = userArr.findIndex((el) => el.email == email);
      // res.json(indexOfEmail);
      if (indexOfEmail < 0) {
            res.json({ message: " This Email  is not exist" })
      } else {
            userArr[indexOfEmail].name = name;
            userArr[indexOfEmail].age = age;
            res.json({ message: "Updated successfully", data: { id: indexOfEmail, name, age } })
      }
})

app.post('/user/searchUser', express.json(), (req, res) => {
      let { id } = req.body;
      let getIdIndex = userArr.findIndex((el) => el.id == id)
      if (getIdIndex < 0) {
            res.json({ message: "Thsi user id does not exist!!", data: id })
      } else {
            let searchedIndex = userArr[getIdIndex];
            let { name, age, email, id } = searchedIndex;
            res.json({ message: "user id ", data: { userName: name, userAge: age, userEmail: email, userId: id } });
      }
})

app.post('/user/sortedByName', express.json(), (req, res) => {
      if (userArr.length > 0) {
            let sortedArr = userArr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            res.json({ message: "sorted alphabeticaaly result", foundedNumber: sortedArr.length, sortedArr });
      }
      else if (userArr.length == 0) {
            res.json({ message: "sorted alphabeticaaly result", foundedNumber: sortedArr.length, userArr });
      }
      else {
            res.json({ message: "this field is empty !!!" })
      }
})


// posts
app.get('/posts', (req, res) => {
      res.json(postArr);
})

app.post('/addPost', express.json(), (req, res) => {
      let { post, userEmail } = req.body;
      let userIsExist = userArr.findIndex((el) => el.email == userEmail)
      if (userIsExist < 0) {
            res.json({ message: " This email is already exist try another one", data: req.body.email })
      }
      if (post.length === 0) {
            res.json({ message: " the post is empty , there is no value", data: req.body.post })
      }
      else {
            let newObj = { id: postArr.length + 1, userEmail: userEmail, postedBy: userArr[userIsExist].name, post: post }
            let newPostArr = postArr.push(newObj);
            res.json({ message: " post added succesfuly", data: req.body, newPostArr, postArr })
      }
})

app.put('/updatePost', express.json(), (req, res) => {
      let { id, userEmail, post } = req.body;
      let indexOfPost = userArr.findIndex((el) => el.userEmail == userEmail && el.post == post && el.id == id);
      if (indexOfPost < 0) {
            res.json({ message: " this Id does not exit" });
      } else {
            postArr[indexOfPost].post = post;
            postArr[indexOfPost].postedBy = postArr[indexOfPost].postedBy;
            postArr[indexOfPost].userEmail = postArr[indexOfPost].userEmail;
            postArr[indexOfPost].id = postArr[indexOfPost].id;
            res.json({ message: "post udpated succesfuly", data: { id: indexOfPost, postedBy: postArr[indexOfPost].postedBy, userEmail: postArr[indexOfPost].userEmail, post: post } })

      }
})

app.post('/search/postId', express.json(), (req, res) => {
      let { id } = req.body;
      let index = postArr.findIndex((el) => el.id == id);
      if (index < 0) {
            res.json({ message: " this Id does not exit" });
      } else {
            let postData = postArr[index];
            let { id, post, postedBy, userEmail } = postData;
            res.json({ message: "post deleted succesfuly", data: { userId: id, postedBy: postedBy, userEmail: userEmail, post: post } })
      }
})

app.post('/search/PostUserEmail', express.json(), (req, res) => {
      let { email } = req.body;
      let index = userArr.findIndex((el) => el.email == email);
      if (index < 0) {
            res.json({ message: " this email does not exist" });
      }
      else {
            let newArr = postArr.filter((el) => el.userEmail == email);
            res.json({ message: "get all posts  succesfuly", data: newArr })
      }
})

app.delete('/postdelete', express.json(), (req, res) => {
      let { id } = req.body;
      let index = postArr.findIndex((el) => el.id == id);
      if (index < 0) {
            res.json({ message: " this post does not exist" });
      }
      else {
            delete postArr[index];
            res.json({ message: "deleted Successfuly", data: postArr })
      }
})

// app.post('/post/sorted' , express.json() , (req , res) => {
//       if (postArr.length > 0) {
//             let sortedArr = userArr.sort((a, b) => a.post.toLowerCase() > b.post.toLowerCase() ? 1 : -1);
//             res.json({ message: "sorted alphabeticaaly result", foundedNumber: sortedArr.length, sortedArr });
//       }
//       else if (postArr.length == 0) {
//             res.json({ message: "sorted alphabeticaaly result", foundedNumber: sortedArr.length, sortedArr });
//       }
// })




app.listen('3000', () => {
      console.log("server runnning ok ok ");
});
