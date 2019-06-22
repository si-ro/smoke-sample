import {Node} from 'smoke-node'

const node0 = new Node() // 0.0.0.1

const node1 = new Node() // 0.0.0.2

const node2 = new Node() // 0.0.0.3

// node0 - The video source.

node0.rest.createServer().get('/mediastream', (req: any, res: any) => {

  console.log('node0')
  const mediastream = node0.media.createTestPattern()

  res.mediastream(mediastream)

}).listen(80)

// node1 - The video proxy.

const app1 = node1.rest.createServer()

app1.get('/mediastream', async (req: any, res: any) => {

  console.log('node1')
  const response = await node1.rest.fetch('rest://0.0.0.1/mediastream')

  res.mediastream(await response.mediastream())

}).listen(80)

// node2 - the client

;(async () => {

  console.log('node2')
  const response = await node2.rest.fetch('rest://0.0.0.2/mediastream')

  const video = document.getElementById('video-0') as HTMLVideoElement

  video.srcObject = await response.mediastream()

  video.play()

})()