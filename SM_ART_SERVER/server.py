import asyncio
import websockets
import json
from openal import *
import audioread
import socket
import platform
import subprocess

#SETTINGS
if platform.system() == 'Linux':
    IP = subprocess.check_output(["hostname","-I"]).decode().split(" ")[0]
else:
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
        print('> play ambiance ' + str(self.ambianceName))
        with open(AMBIANCE_PATH) as json_file:
            data = json.load(json_file)
            for source in data[self.ambianceName]:
                path = SOUND_DIRECTORY + data[self.ambianceName][source]['path']
                x,y,z = data[self.ambianceName][source]['position']
                
                source = oalOpen(path)
                source.set_cone_inner_angle(360)
                source.set_cone_outer_angle(360)
                source.set_position((x,y,z))
                source.set_looping(True)
                source.play()
                self.sourceList.append(source)
            if ambiancelist.get(self.ambianceName): #si l'ambiance etait deja en train d'etre jouee on l'ecrase
                ambiancelist.get(self.ambianceName).stop()
            ambiancelist[self.ambianceName] = self

    def stop(self):
        print('> stop ambiance ' + str(self.ambianceName))
        for source in self.sourceList:
            source.stop()

#FUNCTIONS TO PLAY SOUNDS
def play(args):
    sound = args[0]
    if len(args) > 1:
        x,y,z = map(int, args[1].split(","))
    soundpath = SOUND_DIRECTORY + sound + ".wav"
    print('> play ' + soundpath)
    if soundlist.get(sound): #if sound was in pause
        source = soundlist[sound]
    else:
        source = oalOpen(soundpath)
        if len(args) > 1:
            source.set_position((x,y,z))
        soundlist[sound] = source
    source.set_cone_inner_angle(360)
    source.set_cone_outer_angle(360)
    source.play()
    return str(audioread.audio_open(soundpath).duration)

def pause(sound):
    soundpath = SOUND_DIRECTORY + sound + ".wav"
    print('> pause ' + soundpath)
    soundlist[sound].pause()

def stop(sound, delete=True):
    soundpath = SOUND_DIRECTORY + sound + ".wav"
    if sound in soundlist.keys():
        print('> stop ' + soundpath)
        soundlist[sound].stop()
        if delete:
            del soundlist[sound]

def stopall():
    for sound in soundlist:
        stop(sound, delete=False)
    soundlist.clear()
    for ambiance in ambiancelist:
        ambiancelist[ambiance].stop()

async def main(websocket, path):
    while True:
        packet = await websocket.recv()
        data = json.loads(packet)

        cmd = data['cmd']
        args = data['arg'].split(" ")

        if(cmd == "play"):
            message = play(args)
            await websocket.send(message)

        elif(cmd == "pause"):
            pause(args[0])

        elif(cmd == "stop"):
            stop(args[0])

        elif(cmd == "playa"):
            ambiance = Ambiance(args[0])
            ambiance.play()

        elif(cmd == "stopa"):
            ambiancelist[args[0]].stop()
            del ambiancelist[args[0]]

        elif(cmd == "stopall"):
            stopall()

#INIT SPACE

#When speakers are connected use the first line
#oalInit(b"OpenAL Soft on Haut-parleurs (USB Sound Device        )")
oalInit()

contextlistener = oalGetListener()  #context listener represent the human listening in the room
contextlistener.set_position((0, 0, 0))

#CREATE WEBSOCKET
gsocket = websockets.serve(main, IP, PORT)
print('Server running at ' + IP + ':' + str(PORT))

asyncio.get_event_loop().run_until_complete(gsocket)
asyncio.get_event_loop().run_forever()