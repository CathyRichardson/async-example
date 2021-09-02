//*************GENERIC EXAMPLE****************

const thenSyntax = () => {
    funcThatReturnsPromise().then((promiseResult) => {
      //code that runs after promise resolves
    }).catch((error) => {
      //code that runs in case of error
    })
  }
  
  const asyncSyntax = async () => {
    try{
      const promiseResult = await funcThatReturnsPromise();
      //Code that runs after promise resolves
    } catch (e) {
      //code that runs in case of error
    }
  }



  //*************EXAMPLE FROM DRAGONS LAIR*************
  
  const register = async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
      const db = req.app.get('db');
      const result = await db.get_user([username]);
      const existingUser = result[0];
      if (existingUser) {
        return res.status(409).send('Username taken');
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const registeredUser = await db.register_user([isAdmin, username, hash]);
      const user = registeredUser[0];
      req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
      return res.status(201).send(req.session.user);
    } catch (error) {
      res.status(400).send("Error registerring user")
    }
  }
  
  const register = (req, res) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get('db');
    db.get_user([username]).then((result) => {
      const existingUser = result[0];
      if (existingUser) {
        return res.status(409).send('Username taken');
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.register_user([isAdmin, username, hash]).then((registerredUser) => {
        const user = registeredUser[0];
        req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
      })
      return res.status(201).send(req.session.user);
    }).catch(() => {
      res.status(400).send("Error registerring user")
    })
  }