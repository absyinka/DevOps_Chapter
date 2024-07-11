# Import from both custom and buit-in modules
import read_file as rf
import utils
import json
import ast

# Get the file path
file_path = "server_details.txt"  

# Read the file line-by-line using the custom read_file_lines() function from the readFile module
file_contents = rf.read_file_lines(file_path)

"""
Using the built-in json module
The loads() function is designed to parse a valid JSON string and convert it into a native Python object
In this case it parses the content on the first line to a dictionary. Check the file content for better understanding
"""
servers = json.loads(file_contents[0])

# Iterating over the dictionary to display the location against the uptime percentange, using zip() function
"""
The zip() function in Python acts like a zipper for iterables (sequences like lists, tuples, strings). It combines elements from those iterables into tuples, pairing corresponding elements together
"""
for location, uptime in zip(servers["locations"], servers["uptime"]):
  print(f"{location} => {uptime:.2f}")

# Doing the same thing as above using range and indexes --- Uncomment the code below to test how it works
# for i in range(len(servers["locations"])):
#   uptime = servers["uptime"][i]
#   location = servers["locations"][i]
#   print(f"{location}: {uptime:.2f}")

"""
Reading the set of devops engineer from the server_details.txt file
Since the content is a string of set collection, there is need to convert it so it becomes iterable by using the literal_eval() 
function from the ast module. 
Note: There is a popular function eval() that does the same thing as literal_eval() but it is not safe
"""
devopsEngineers = ast.literal_eval(file_contents[1])

# Iterating over the data using iterate_data() from the custom built utils module
for item in utils.iterate_data(devopsEngineers):
  print(item)
