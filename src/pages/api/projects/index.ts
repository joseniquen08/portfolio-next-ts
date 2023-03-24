import type { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from '../../../lib/firebase/admin';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const projects: any = [];
  const data = await firestore.collection('projects').get();

  if (!data) {
    return res.status(404).json({});
  }

  data.forEach((project) => {
    projects.push({ id: project.id, ...project.data() });
  });

  return res.status(200).json({ projects });
}
