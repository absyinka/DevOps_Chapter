import random

users = ["Tade", "Wola", "Tola", "Adedoyin"]
random.shuffle(users)

logged_in_user = random.choice(users)

username = input("Enter username: ")

for user in logged_in_user:
    if username == logged_in_user:
        print(f"{username} is the logged in user")
        break
    elif username not in users:
        print(f"{username} not in the list of users")
        break
    else:
        print(f"{username} is not the logged in user, {logged_in_user} is...")
        break