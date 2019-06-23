import { expect } from 'chai';
import 'mocha';
import { backend } from '../src/index';
import { backendNock } from './MockHelpers';


describe('DvrService', () => {
    before(() => {
        backendNock('Dvr').get("/GetEncoderList").reply(200, () => {
            return {
                EncoderList: {
                    Encoders: [{
                        Id: 1
                    }]
                }
            }
        }).get('/GetRecordedList')
            .query({
                TitleRegEx: 'ABC'
            }).reply(200, () => {
                return {
                    ProgramList: {
                        Count: 1
                    }
                };
            })
    })
    it('GetEncoderList', async () => {
        expect(await backend.dvrService.GetEncoderList()).to.include.deep.members([{ Id: 1 }]);
    })

    it('GetRecordedList', async () => {
        expect(await backend.dvrService.GetRecordedList({
            TitleRegEx: 'ABC'
        })).to.have.property('Count', 1)
    })
})