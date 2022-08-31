# Gendiff

[![Actions Status](https://github.com/isimyi/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/isimyi/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/bb437bb7da822b73fd05/maintainability)](https://codeclimate.com/github/isimyi/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bb437bb7da822b73fd05/test_coverage)](https://codeclimate.com/github/isimyi/frontend-project-lvl2/test_coverage)
[![Linter Checks Status](https://github.com/isimyi/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/isimyi/frontend-project-lvl2/actions/workflows/nodejs.yml)

Compares two configuration files and shows a difference.

- [Installation](#inslattalion)
- [Usage](#usage)

## Installation
1. Clone project 
    ```
    git@github.com:isimyi/frontend-project-lvl2.git
    ```
2. Go to project directory
    ```
    cd frontend-project-lvl2
    ```
3. Install dependencies
    ```
    make install
    ```
4. Create symlink to the package in global folder
    ```
    npm link
    ```
   
## Usage
For help information

    gendiff -h

To compare files

    gendiff <filepath1> <filepath2>

Gendiff comes with several formatter options: stylish, plain and json. By default, output will be formatted with stylish. 
You can specify formatter using `--format` or `-f` flag on command line.

    gendiff <filepath1> <filepath2> -f plain

## Output examples
### stylish 
#### Flat JSON files
[![asciicast](https://asciinema.org/a/HbyFAvRA8PHMMJ1XVFPixixN1.svg)](https://asciinema.org/a/HbyFAvRA8PHMMJ1XVFPixixN1)

#### Flat YAML files
[![asciicast](https://asciinema.org/a/EF1fiqtqPd2zuUewfUQDissav.svg)](https://asciinema.org/a/EF1fiqtqPd2zuUewfUQDissav)

#### Nested JSON files
[![asciicast](https://asciinema.org/a/OexmlOPDpePpTXGqGRX2MfAwF.svg)](https://asciinema.org/a/OexmlOPDpePpTXGqGRX2MfAwF)

### plain
[![asciicast](https://asciinema.org/a/sQxV7puXHHqvrujwYbQ4LM20n.svg)](https://asciinema.org/a/sQxV7puXHHqvrujwYbQ4LM20n)

### json
[![asciicast](https://asciinema.org/a/l0YjkM1bWAfUOqgBvGybkUmoc.svg)](https://asciinema.org/a/l0YjkM1bWAfUOqgBvGybkUmoc)
