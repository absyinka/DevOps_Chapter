def myfunc(x):
  print(f"Python is {x}")


def iterate_data(data):
    """
    This function iterates through various data structures and yields elements.

    Args:
        data: The data structure to iterate over (set, dictionary, list, tuple).

    Yields:
        The elements of the data structure.
    """

    if isinstance(data, (set, list, tuple)):
        for item in data:
            yield item
    elif isinstance(data, dict):
        for key in data:
            yield key, data[key]  # Yield both key and value for dictionaries
    else:
        raise TypeError("Unsupported data type for iteration.")
