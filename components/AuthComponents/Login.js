import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack, Icon, Pressable } from 'native-base';
import React from 'react'
// import useAppContext from '../../store/userContext';
// import GradientView from '../GradientView';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const SignIn = ({setNewUser}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [fromSubmitted, setFormSubmitted] = React.useState(false)
  const [show, setShow] = React.useState(false)

  // const {setUser} = useAppContext ()

  const navigation = useNavigation()

  const handleSignIn = async () => {
    setFormSubmitted(true)
    if(email && password ){
      setLoading(true)
      try{
        const user = await Auth.signIn(email, password)
          .then(data => {

            setUser(data)
            setLoading(false)
            navigation.navigate('Journal')
          })
      }
      catch (error) {
        console.log('error signing in', error)
        alert(error.message)
        setLoading(false)
      }

    }
  }


  return (
  <Center   w="100%" h="full" >
    <Box safeArea p="2" w="90%" maxW="400" py="8">
      <Heading size="2xl"  _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
        Welcome
      </Heading>
      <Heading mt="1"  _dark={{
        color: "white"
      }} fontWeight="medium" size="xs">
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired  isInvalid={fromSubmitted && !email} >
          {/* <FormControl.Label color="amber.400">Email ID</FormControl.Label> */}
          <Input borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)"    onChangeText={setEmail} value={email}  placeholder='Email' fontSize='16'
              InputLeftElement={<Icon as={<MaterialIcons name='email' />} size={5} ml="2" color="muted.400" />} />
          <FormControl.ErrorMessage  color="red.500">Email is required</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={fromSubmitted && !password }>
          {/* <FormControl.Label  >Password</FormControl.Label> */}
          <Input borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)"   onChangeText={setPassword} value={password} fontSize='16'
             type={show ? "text" : "password"}InputLeftElement={<Icon as={<MaterialIcons name='lock' />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}  >
             <Icon as={<MaterialIcons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
           </Pressable>} placeholder="Password"/>
          <FormControl.ErrorMessage  color="red.500">Password is required</FormControl.ErrorMessage>
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1"
          onPress={() => navigation.navigate('ForgotPassword')}
          >
              Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={()=> handleSignIn()} >
          {loading ? ' loading...' : 'Sign in'}
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm"  _dark={{
            color: "white"
          }}>
                I&apos; m a new user.{" "}
          </Text>

          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} 
          onPress={()=>
          navigation.navigate('Signup')
            // setNewUser(true)
          }
          >
                Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  </Center>);
};
export default SignIn