import base64,io,zlib,builtins

def open(filename,mode='rb',*args,**kwargs):
 data=builtins.open(filename,'rb').read()
 if data[:2]==b'\x1f\x8b': return io.BytesIO(zlib.decompress(data,16+zlib.MAX_WBITS))
 try:
  raw=base64.b64decode(data,validate=True)
  if raw[:2]==b'\x1f\x8b': return io.BytesIO(zlib.decompress(raw,16+zlib.MAX_WBITS))
 except Exception: pass
 return io.BytesIO(data)