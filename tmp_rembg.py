import os
from rembg import remove

def do_it():
    in_dir = "tmp_icons2"
    out_dir = "public/images/icons"
    for fname in os.listdir(in_dir):
        if fname.endswith(".png"):
            with open(os.path.join(in_dir, fname), "rb") as i:
                out = remove(i.read())
            with open(os.path.join(out_dir, fname), "wb") as o:
                o.write(out)
            print("done", fname)

do_it()
