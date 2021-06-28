
def id_generate(title, author):
    name = author.replace(".", "")
    title_compo = title.lower().split(" ")
    for compo in title_compo[:]:
        if compo == 'the' or compo == 'in' or compo == 'on' or compo == 'of' or compo == 'a':
            title_compo.remove(compo)
    return str(len(name.replace(" ", "")) % 10) \
           + author[0] \
           + title_compo[0][1].upper() \
           + title_compo[0][0].upper() \
           + str(len(title.replace(" ", "")) % 10) \
           + chr(ord(title_compo[1][2]) - 31) \
           + chr(ord(title_compo[1][1]) - 31) \
           + chr(ord(title_compo[1][0]) - 31)


books = {"Robinson Crusoe": "Daniel Defoe",
         "The Invisible Man": "H. G. Wells",
         "The Island of Doctor Moreau": "H. G. Wells",
         "The Time Machine": "H. G. Wells",
         "Kafka on The Shore": "Haruki Murakami",
         "The Wind-up Bird Chronicle": "Haruki Murakami",
         "Peter Pan": "J. M. Barrie",
         "Alice in Wonderland": "Lewis Carroll",
         "The Black Swan": "Nassim Nicholas Taleb",
         "Universe in A Nutshell": "Stephen Hawking"}

ids = []
for titl, auth in books.items():
    output = id_generate(titl, auth)
    ids.append(output)

print(ids)