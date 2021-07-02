import moment from "moment";
import React from "react";
import { convertBytes } from "./helpers";

const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
  return (
    <div className="playlist">
        <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                    <th scope="col" style={{ width: '10px'}}>id</th>
                    <th scope="col" style={{ width: '200px'}}>name</th>
                    <th scope="col" style={{ width: '230px'}}>description</th>
                    <th scope="col" style={{ width: '120px'}}>type</th>
                    <th scope="col" style={{ width: '90px'}}>size</th>
                    <th scope="col" style={{ width: '90px'}}>date</th>
                    <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                    <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
                  </tr>
                </thead>
                {tracks.map((track,key) => track.hash !== '' && (
                    
                        <thead style={{ 'fontSize': '12px' }} key={key}>
                          <tr onClick={()=>setSelectedTrack(track)}>
                            <td>{track.id}</td>
                            <td>{track.title}</td>
                            <td>{track.description}</td>
                            <td>{track.type}</td>
                            <td>{convertBytes(track.fileSize)}</td>
                            <td>{moment.unix(track.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                            <td>
                              <a
                                href={track.explorer}
                                rel="noopener noreferrer"
                                target="_blank">
                                {track.forger.substring(0,10)}...
                              </a>
                             </td>
                            <td>
                              <a
                                href={"https://ipfs.infura.io/ipfs/" + track.hash}
                                rel="noopener noreferrer"
                                target="_blank">
                                {track.hash.substring(0,10)}...
                              </a>
                            </td>
                          </tr>
                        </thead>
                      ))}
                      </table>
    </div>
  );
};

export default PlayList;
