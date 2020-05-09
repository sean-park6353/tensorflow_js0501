

def func():
    a = int(input('input number : '))
    if a < 2:
        return
    else:
        isPrime = True
        i = 2
        while i <= a/2 and isPrime == True:
            if a % i == 0:
                isPrime = False
                break
            i = i+1

        if isPrime == True:
            print('a is prime number')
        else:
            print('a is not prime number')


func()
