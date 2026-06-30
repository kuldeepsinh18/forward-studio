import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

export async function GET() {
  const dir = path.join(process.cwd(), 'public');
  const res = walk(dir);
  return NextResponse.json(res);
}
