import discord
import aiohttp
import requests
from discord.ext import tasks

token = #TOKEN

bot = discord.Client()

@bot.event
async def on_ready():
    print("ready")
    newAnnouncement.start()

def findChannel(name):
    for channel in bot.get_all_channels():
        if channel.name == name:
            return channel

lastPostid = 5
moodle = "http://localhost/webservice/rest/server.php?wstoken=7cad92ab0fd4ef81eb56590a5cdc33f0&wsfunction="
discussions = moodle + "mod_forum_get_forum_discussions&moodlewsrestformat=json&forumid=1"

@tasks.loop(seconds = 20)
async def newAnnouncement():
    global lastPostid
    announceChannel = findChannel('announcements')
    print('loop started')
    async with aiohttp.ClientSession() as session:
        async with session.post(discussions) as response:
            print('here x2')
            if response.status != 200:
                print("page unavailable, update failed")
                return
            data = await response.json()
            posts = data['discussions']
            d = sorted(posts, key = lambda x: x['id'])
            newest = d[-1]
            print(newest['id'], lastPostid)
            if newest['id'] > lastPostid:
                title = newest['subject']
                body = newest['message']
                formatting = body.split(">")
                listContent = [msg[:-3] for msg in formatting if len(msg) > 0 and msg[-3] == '<']
                content = "".join(listContent)
                if len(formatting) == 1:
                    content = body
                author = newest['userfullname']
                print(formatting)
                e = discord.Embed(title = "New Moodle Announcement", description = f"By {author}", color = discord.Color.purple())
                e.add_field(name = title, value = content, inline = False)

                await announceChannel.send(embed = e)
                lastPostid = newest['id']

           # newAnnouncement.stop()
            print('done!')

moodle = "http://localhost/webservice/rest/server.php?moodlewsrestformat=json&wstoken=7cad92ab0fd4ef81eb56590a5cdc33f0&wsfunction=mod_forum_add_discussion&forumid=1&subject="
msg = "&message="
@bot.event
async def on_message(message):
    announceChannel = findChannel('announcements')
    global msg
    global moodle
    if message.channel.name != announceChannel.name or message.author == bot.user:
        return
    idx = str(message.content).find('\n')
    post = moodle + str(message.content)[:idx]
    post = post + msg + str(message.content)[idx+1:]
    print(post)
    r = requests.post(post)
    print(r)
    print(r.json())

bot.run(token)