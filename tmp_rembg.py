import sys
import os
from rembg import remove

def main():
    if len(sys.argv) < 3:
        print("Usage: python tmp_rembg.py <source_path> <dest_path>")
        return

    source = sys.argv[1]
    dest = sys.argv[2]
    
    # Ensure dest directory exists
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    
    try:
        with open(source, "rb") as i:
            data = i.read()
            out = remove(data)
        with open(dest, "wb") as o:
            o.write(out)
        print(f"Successfully processed {source} to {dest}")
    except Exception as e:
        print(f"Error processing {source}: {e}")

if __name__ == "__main__":
    main()
