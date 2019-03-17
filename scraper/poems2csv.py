if __name__ == '__main__':
    '''
    Extracts text of the poems from scraped files
    and writes them into a csv file.
    '''
    from bs4 import BeautifulSoup
    
    import csv
    import os 
    import re 

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    INPUT_DIR = os.path.join(BASE_DIR, 'frames')
    OUTPUT_DIR = os.path.join(BASE_DIR, 'poems')

    '''
    #27 and #100 poems are problematic.

    Japanese transcript: everything seems correct.
    Romanized transcript: everything seems correct.

    English translation: A closing </lg> and 
    opening <lg> tags are missing in eng.html, 
    between Fujiwara no Kanesuke's (27) and Minamoto 
    no Muneyuki's poems (28), making the parser think
    there is only one poem #27. (~ line 976)
    Correct: <hr width=50% size=4> </lg><lg><a names="eng28"> </a>

    English translation: The lxml parser made a 
    work-break of <center> at #100 poem, preventing 
    extraction of the #100 poem lines. (~ line 3556) 
    Correct: <center><h3><a
    href="/japanese/hyakunin/images/onna100.jpg">100</a></h3></center>
    '''

    def extract_poem(soupblock):
        '''
        Look for html elements without important 
        content and decompose. Find strings in the 
        remaining plain text and push them into a list. See 
        https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start 
        '''
        poem = []
        decomposable = ['a', 'h3', 'hr', 'br']

        # print(soupblock.prettify())

        for element in soupblock.find_all(decomposable):
            element.decompose()

        for text in soupblock.stripped_strings:
            if re.match(r'\w', text):
                poem.append(text)

        return poem
     

    def poems2csv():
        files = [ file for file in os.listdir(INPUT_DIR) if file.endswith(".html") ]

        for file in files:
            base = file.split('.')[0]
            input_path = os.path.join(INPUT_DIR, file)
            output_path = os.path.join(OUTPUT_DIR, f'{base}.csv')
            
            with open(input_path, 'r') as htmlfile:
                with open(output_path, 'w', newline='') as csvfile:
                    writer = csv.writer(csvfile)

                    # L1-L5 is used in reference to five-line tanka poems
                    fieldnames = ['ID', 'Author', 'L1', 'L2', 'L3', 'L4', 'L5']
                    writer.writerow(fieldnames)
                    
                    tree = BeautifulSoup(htmlfile, 'lxml')

                    for counter, poemblock in enumerate(tree.find_all('lg')):
                        poem = extract_poem(poemblock)
                        
                        writer.writerow([counter + 1] + poem)

                        print(poem)

    # fin 
    poems2csv()
        
