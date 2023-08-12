#!/bin/bash

# Function to execute the code for each test case
execute_code() {
    local input="$1"
    start_time=$(date +%s.%N)
    case "$lang" in
        "cpp")
            output=$(g++ -o "$FILENAME.out" "$FILENAME.cpp" && ./"$FILENAME.out" < <(echo -e "$input"))
            ;;
        "python")
            output=$(echo -e "$input" | python3 -c "$code")
            ;;
        "javascript")
            output=$(echo -e "$input" | node -e "$code")
            ;;
        "java")
            echo -e "$code" > main.java
            javac main.java && output=$(java main < <(echo -e "$input"))
            ;;
        *)
            echo "Unsupported language: $lang"
            ;;
    esac
    end_time=$(date +%s.%N)

    # Calculate the execution time in seconds
    execution_time=$(echo "scale=6; ($end_time - $start_time) / 1000000000" | bc)

    # Print the output and execution time directly to the console
    echo -e "$output" >> "$FILENAME.txt"
    echo -e "~" >> "$FILENAME.txt"
    echo "Execution Time: $execution_time seconds" >> "$FILENAME.time"
}



# Main script starts here

lang="$LANG"
code="$CODE"

expected_output="$EXPECTED_OUTPUT"
time_limit="$TIMELIMIT"
echo -e $EXPECTED_OUTPUT
> "$FILENAME.txt"  # Create an empty output file
> "$FILENAME.time"

# Loop through each input testcase and execute the code
for ((i = 0; i < INPUT_LENGTH; i++)); do
    input_var="INPUT_$i"  # Create the variable name, e.g., INPUT_0, INPUT_1, etc.
    input="${!input_var}"  # Access the value of the environment variable with the constructed name
    echo -e "$input"
    execute_code "$input"
done
