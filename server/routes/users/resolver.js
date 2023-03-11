const {Patient,Therapist,User} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key,keyPub} = require('../../keys');
// const { setCookie } = require('./cookies');
const Token = require('../../database/models/verificationToken');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');

const resolvers = {
    Mutation:{
        registerPatient: async (parent, args) => {
            const {email,password,name,dateOfBirth,gender,role,
            address,phoneNumber,emergencyContact,medicalConditions,medications
            } = args.patientInput;

            const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with that email already exists');
    }
    const passwordHashed = await bcrypt.hashSync(password, 10);
    
    const user = new User({email,password:passwordHashed,role,patient:{
        name,dateOfBirth,gender,address,phoneNumber,emergencyContact,medicalConditions,medications,
      }});
    await user.save();
    return user;   
          },
     registerTherapist: async (parent, args) => {
            const {email,password,name,dateOfBirth,gender,role,
                license,specialty,description,availability,education,
                experience,languages,fees
                } = args.therapistInput;
    
                const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User with that email already exists');
        }
        const passwordHashed = await bcrypt.hashSync(password, 10);
        const user = new User({email,password:passwordHashed,role,therapist:{
            name,dateOfBirth,gender,license,specialty,description,availability,education,
            experience,languages,fees,
        }});
        await user.save();
        return user;
          },
          async login(parent,{email,password},{res}){
            let userLogged = await User.findOne({email});
            if(userLogged && bcrypt.compareSync(password,userLogged.password)){
                const token = jwt.sign(
                    {},
                    key,{
                        subject:userLogged._id.toString(),
                        algorithm:'RS256',
                        expiresIn:60*60*60*30 *6
                    }
                    );
           return  {
            token,email:userLogged.email,role:userLogged.role
           }
                }
            return "failed";
            }  
    },
    Query: {   
        async user(_, {ID}) {
            return await User.findById(ID)
        },
        checkEmailExists: async (_, { email }, { models }) => {
            const user = await models.User.findOne({ where: { email } });
            return Boolean(user);
          },
            // sendForgotPasswordEmail: async (
            //     _,
            //     { email },
            //     { redis }
            //   ) => {
            //     const user = await User.findOne({ where: { email } });
            //     if (!user) {
            //       return [
            //         {
            //           path: "email",
            //           message: userNotFoundError
            //         }
            //       ];
            //     }
          
            //     return true;
            //   },
            //   forgotPasswordChange: async (
            //     _,
            //     { newPassword, key },
            //     { redis }
            //   ) => {
            //     const redisKey = `${forgotPasswordPrefix}${key}`;
          
            //     const userId = await redis.get(redisKey);
            //     if (!userId) {
            //       return [
            //         {
            //           path: "key",
            //           message: expiredKeyError
            //         }
            //       ];
            //     }
          
            //     try {
            //       await schema.validate({ newPassword }, { abortEarly: false });
            //     } catch (err) {
            //       return formatYupError(err);
            //     }
          
            //     const hashedPassword = await bcrypt.hash(newPassword, 10);
          
            //     const updatePromise = User.update(
            //       { id: userId },
            //       {
            //         forgotPasswordLocked: false,
            //         password: hashedPassword
            //       }
            //     );
          
            //     const deleteKeyPromise = redis.del(redisKey);
          
            //     await Promise.all([updatePromise, deleteKeyPromise]);
          
            //     return null;
            //   }
      
    },
  }
module.exports = resolvers;
   