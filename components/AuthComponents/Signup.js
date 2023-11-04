import { Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Link, Pressable, Text, VStack } from 'native-base';
import React from 'react'
import { Auth } from 'aws-amplify';
// import useAppContext from '../../store/userContext';
import { useNavigation } from '@react-navigation/native';
// import GradientView from '../GradientView';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const RegiserUser = ({ setNewUser }) => {
  // const { setConfirmationEmail, setUser } = useAppContext()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('')
  const [fromSubmitted, setFormSubmitted] = React.useState(false)
  const [show, setShow] = React.useState(false)


  const navigation = useNavigation()

  const handleSignIn = async () => {
    setFormSubmitted(true)
    if (password && confirmPassword && username && email && password === confirmPassword) {
      setLoading(true)
      try {
        const user = await Auth.signUp({
          password,
          username: email,
          email,

          attributes: {
            email,
            name: username,
            preferred_username: username
            // optional
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
            enabled: true,
          },
          validationData: [],  //optional
        })
          .then(data => {

            setConfirmationEmail(email)
            setUser(data?.user)
            setLoading(false)
            navigation.navigate('ConfirmationEmail')
          })
          .catch(err => console.log(err));
      }
      catch (error) {

        alert(error.message)
        setLoading(false)
      }
    }

  }


  return  (
    <Center w="100%" h="full" >
      <Box safeArea p="2" w="90%" maxW="400" py="8">
        <Heading size="2xl" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
          color: "white"
        }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={fromSubmitted && !username}>
            {/* <FormControl.Label color="white" >UserName</FormControl.Label> */}
            <Input  borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)" onChangeText={setUsername} value={username}  placeholder='Username' fontSize='16'
              InputLeftElement={<Icon as={<MaterialIcons name='account' />} size={5} ml="2" color="muted.400" />}
            />
            <FormControl.ErrorMessage p='0' m='0' color='red' fontSize='xs' > Please enter a username </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={fromSubmitted && !email}>
            {/* <FormControl.Label color="white" >Email</FormControl.Label> */}
            <Input borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)" type='email' onChangeText={setEmail} value={email} placeholder='Email' fontSize='16'
              InputLeftElement={<Icon as={<MaterialIcons name='email' />} size={5} ml="2" color="muted.400" />} />
            <FormControl.ErrorMessage p='0' m='0' color='red' fontSize='xs'> Please enter a email adderss </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={fromSubmitted && !password && password.length > 8}>
            {/* <FormControl.Label color="white" >Password</FormControl.Label> */}
            <Input borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)" onChangeText={setPassword} value={password}  fontSize='16'
             type={show ? "text" : "password"}InputLeftElement={<Icon as={<MaterialIcons name='lock' />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}  >
             <Icon as={<MaterialIcons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
           </Pressable>} placeholder="Password"/>
            <FormControl.ErrorMessage p='0' m='0' color='red' fontSize='xs'> Please enter a valid password </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={fromSubmitted && (!confirmPassword || confirmPassword !== password)}>
            {/* <FormControl.Label color="white" >Confirm Password</FormControl.Label> */}
            <Input borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)" type="password" onChangeText={setConfirmPassword} value={confirmPassword} fontSize='16' InputRightElement={<Pressable onPress={() => setShow(!show)}  >
             <Icon as={<MaterialIcons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
           </Pressable>} placeholder="Confirm Password" InputLeftElement={<Icon as={<MaterialIcons name='lock-open-check' />} size={5} ml="2" color="muted.400" />}  />
            <FormControl.ErrorMessage p='0' m='0' color='red' fontSize='xs'> Please enter a valid password </FormControl.ErrorMessage>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={() => handleSignIn()} >
            {loading ? 'loading...' : 'Sign up'}
          </Button>
        </VStack>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" _dark={{
            color: "white"
          }}>
            I&apos;m already a user.{" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }}
            onPress={() => 
              navigation.navigate('Login')
              // setNewUser(false)
            }
          >
            Sign In
          </Link>
        </HStack>
      </Box>
    </Center>
  )
};
export default RegiserUser