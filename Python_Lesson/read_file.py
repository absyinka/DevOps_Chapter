def read_file_lines(filename):
  """
  This function reads lines from a file line by line using a while loop and returns them as a list.

  Args:
      filename (str): The path to the file to read.

  Returns:
      list: A list containing the lines of the file, or None if there's an error.
  """

  try:
    with open(filename, 'r') as file:
      lines = []
      while True:
        line = file.readline()
        if not line:
          break
        lines.append(line)  # Append each line to the list
      return lines  # Return the list of lines after reading

  except FileNotFoundError:
    print(f"Error: File '{filename}' not found.")
    return None  # Return None on error