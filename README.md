# Points of Interest
Sitting in your cubicle, just dreaming of your next vacation? This app will randomly suggest the next city to venture off to and give you the points of interest within that city! Pack your bags! ✈️

## ERD
<img width="743" alt="screen shot 2018-09-04 at 11 47 09 am" src="https://user-images.githubusercontent.com/34017121/45042277-52496900-b038-11e8-80dc-d6530d27f102.png">


## User Stories
1. As a user, I want to know what points of interest are within the city selected.
2. As a user, I want to see what other people have said about the city.
3. As a user, I want to be able to share my experience within that city.
4. As a user, I want to delete comments on posts.
5. As a user, I want to update comments on posts.
6. As a user, I want help in deciding where I should go on my next vacation

## Wireframe
<img width="804" alt="screen shot 2018-09-04 at 12 22 37 pm" src="https://user-images.githubusercontent.com/34017121/45044155-4ad88e80-b03d-11e8-94dd-e09da339e3a4.png">
<img width="804" alt="screen shot 2018-09-04 at 12 22 48 pm" src="https://user-images.githubusercontent.com/34017121/45044160-4ca25200-b03d-11e8-90db-9f9f4e4eaaed.png">

## Setup:

1. Fork, clone and open the code in your text editor.
2. From poi_api, run rails db:migrate to setup the schema.
3. From poi_api, run rails db:seed to seed your db.
4. cd into poi_api, run rails s to start your BE server.
5. cd into client, run yarn start (select Y when prompted) to render your FE in the browser.
6. login with Email: testemail@testemail.com, PW: testpassword
OR
7. Create an account and start messing around.

## Code Snippets

### The switch statement to render views
```
determineWhichToRender() {
    const {
      currentView,
      idCity,
      city,
      cities,
      city_id,
      user_id,
      isLoggedIn
    } = this.state;

    switch (currentView) {
      case 'HomePage':
        return <HomePage
          city={city}
          cities={cities}
          randomCity={this.randomCity}
          pickCity={this.pickCity}
          findCity={this.findCity}
          login={this.handleLogin}
        />

      case 'City':
        return <City
          city_id={city_id}
          cityName={this.state.cityName}
          id={idCity}
          handleChange={this.handleChange}
          isLoggedIn={isLoggedIn}
          newPost={this.newPost}
          user_id={user_id}
        />

      case 'Login':
        return <Login handleChange={this.handleChange}
          login={this.login}
          logout={this.logout}
          email={this.state.email}
          password={this.state.password}
          isRegister={this.state.isRegister}
          register={this.register}
        />
      case 'User':
        return <User user_id={user_id}
          editPost={this.editPostView}
          userPosts={this.state.userPosts} />
      case 'EditPost':
        return <EditPost
          postEdit={this.state.postEdit}
          handleEditPost={this.handleEditPost}
          handlePostDelete={this.handlePostDelete} />
    }

  }
```

### Used jwt decode to grab the user id and store in state
```
findUserId() {
    const jwt = localStorage.getItem("jwt")
    const decoded = jwtDecode(jwt)
    getUserInfo(decoded.sub)
      .then(data =>
        this.setState({
          user_id: data.id,
          userInfo: data,
          isLoggedIn: true,
          currentView: 'HomePage'
        }))
  }
```
## Resources

Auth:
https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
JZ react-rails-token-auth repo

https://www.npmjs.com/package/jwt-decode

## Dependencies
react
rack-cors
bcrypt
knock
rails
es-lint
jwt-decode
bulma

