import { NextApiRequest, NextApiResponse } from 'next'

type TestRes = {
    from: string
    to: string
    sushi: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<TestRes>) => {
    console.log("req: ", req);
    res.status(200).json({ from: 'Test', to: 'This is a test', sushi: '10' })
} 
export default handler;
