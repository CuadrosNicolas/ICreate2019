import asyncio
import websockets
import json
from openal import *
import audioread
import socket

#SETTINGS
IP = socket.gethostbyname(socket.gethostname())
PORT = 8080

#PATHS
SOUND_DIRECTORY = "sounds/"
AMBIANCE_PATH = SOUND_DIRECTORY + "ambiances.json"

global gsocket
soundlist = {}      #dictionnary containing loaded sounds (name : object)
ambiancelist = {}   #dictionarry containing ambiances


#Class creating an Ambiance object from sounds in the ambiances.json file
class Ambiance:
    def __init__(self, ambianceName):
        self.ambianceName = ambianceName
        self.sourceList = []

    def play(self):
        with open(AMBIANCE_PATH) as json_file:
            data = json.load(json_file)
            for source in data[self.ambianceName]:
                path = SOUND_DIRECTORY + data[self.ambianceName][source]['path']
                x,y,z = data[self.ambianceName][source]['position']

                print(str(x) + "," + str(y) + "," + str(z))
                
                source = oalOpen(path)
                source.set_cone_inner_angle(360)
                source.set_cone_outer_angle(360)
                source.set_position((x,z,y))
                source.set_looping(True)
                source.play()
                self.sourceList.append(source)
            if ambiancelist.get(self.ambianceName): #si l'ambiance etait deja en train d'etre jouee on l'ecrase
                ambiancelist.get(self.ambianceName).stop()
            ambiancelist[self.ambianceName] = self

    def stop(self):
        for source in self.sourceList:
            source.stop()

#FUNCTIONS TO PLAY SOUNDS
def play(sound):
    soundpath = SOUND_DIRECTORY + sound + ".wav"
    print('play ' + soundpath)
    if soundlist.get(sound): #if sound was in pause
        source = soundlist[sound]
    else:
        source = oalOpen(soundpath)
        soundlist[sound] = source
    source.play()
    print(soundlist)

    return str(audioread.audio_open(soundpath).duration)

def pause(sound):
    soundpath = SOUND_DIRECTORY + sound + ".wav"
    print('pause ' + soundpath)
    soundlist[sound].pause()
    print(soundlist)

def stop(sound):
    soundpath = SOUND_DIRECTORY + sound + ".mp3"
    print('stop ' + soundpath)
    soundlist[sound].stop()
    del soundlist[sound]
    print(soundlist)

async def main(websocket, path):
    while True:
        packet = await websocket.recv()
        data = json.loads(packet)

        cmd = data['cmd']
        arg = data['arg']

        if(cmd == "play"):
            message = play(arg)
            await websocket.send(message)

        elif(cmd == "pause"):
            pause(arg)

        elif(cmd == "stop"):
            stop(arg)

        elif(cmd == "playa"):
            ambiance = Ambiance(arg)
            ambiance.play()
            print(ambiancelist)

        elif(cmd == "stopa"):
            ambiancelist[arg].stop()
            del ambiancelist[arg]
            print(ambiancelist)

#INIT SPACE

#When speakers are connected use the first line
#oalInit(b"OpenAL Soft on Haut-parleurs (2- USB Sound Device        )")
oalInit()

contextlistener = oalGetListener()  #context listener represent the human listening in the room
contextlistener.set_position((0, 0, 0))
contextlistener.velocity = 0, 0, 0
contextlistener.orientation = 0, 1, 0, 0, 0, 1

#CREATE WEBSOCKET
gsocket = websockets.serve(main, IP, PORT)
print('server running at ' + IP + ':' + str(PORT))

asyncio.get_event_loop().run_until_complete(gsocket)
asyncio.get_event_loop().run_forever()