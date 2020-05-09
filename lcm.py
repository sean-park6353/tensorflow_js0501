def func():
    a = int(input('insert number '))
    b = int(input('insert number '))
    A = a
    B = a

    while A == B:
        if A < B:
            A = a+A
        elif A > B:
            B = b+B
        else:
            return A


print(func())
