import discord
import aiohttp
import json
from bs4 import BeautifulSoup
from discord.ext import tasks

token = 'ODY1ODczNDQwNDMwMzU4NTI5.YPKVew.m-OGXCqJyMPvFHWiKMKnXQ2VvqU'

bot = discord.Client()

@bot.event
async def on_ready():
    print("ready")
    newAnnouncement.start()

lastPostid = 4
announceChannel = bot.get_channel(865992034920431626)
moodle = "http://localhost/webservice/rest/server.php?wstoken=7cad92ab0fd4ef81eb56590a5cdc33f0&wsfunction="
discussions = moodle + "mod_forum_get_forum_discussions&moodlewsrestformat=json&forumid=1"

@tasks.loop(seconds = 20)
async def newAnnouncement():

    for channel in bot.get_all_channels():
        if channel.name == 'announcements':
            announceChannel = channel

    global lastPostid
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
            if newest['id'] < lastPostid:
                title = newest['subject']
                body = newest['message']
                formatting = body.split(">")
                listContent = [msg[:-3] for msg in formatting if len(msg) > 0 and msg[-3] == '<']
                content = ""
                for c in listContent:
                    content += c
                author = newest['userfullname']
                e = discord.Embed(title = "New Moodle Announcement", description = f"By {author}", color = discord.Color.purple())
                e.add_field(name = title, value = content, inline = False)

                await announceChannel.send(embed = e)
                print(announceChannel.id)
                lastPostid = newest['id']

            newAnnouncement.stop()
            print('done!')


bot.run(token)