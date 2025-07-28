import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const DynamicPage = () => {
    const { pageName } = useParams();
    const [comments, setComments] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [text, setText] = useState('');
    const userId = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).user_id;
    const [histories, setHistories] = useState([]);


    useEffect(() => {
        fetchComments();
        fetchPermissions();
        fetchHistories();
    }, []);

    const fetchComments = async () => {
        await api.get('/comment/comments/').then(res => {
            const filtered = res.data.filter(c => c.page === pageName);
            setComments(filtered);
        });
    };

    const fetchPermissions = async () => {
        await api.get('/user/permissions/').then(res => {
            // const filtered = res.data.filter(p => p.user === userId && p.page === pageName);
            const filtered = res.data.filter(p => p.page === pageName);
            setPermissions(filtered);
        });
    };

    const fetchHistories = async () => {
        await api.get('/comment/history/').then(res => {
            setHistories(res.data);
        });
    };

    const getHistoryTooltip = (commentId) => {
        const historyItems = histories.filter(h => h.comment === commentId);
        return (
            <Tooltip>
                {historyItems.length === 0 ? (
                    <div>No changes</div>
                ) : (
                    historyItems.map(h => (
                        <div key={h.id}>
                            <div><strong>User:</strong> {h.modified_by}</div>
                            <div><strong>When:</strong> {new Date(h.modified_at).toLocaleString()}</div>
                            <div><strong>Old:</strong> {h.old_text}</div>
                            <hr />
                        </div>
                    ))
                )}
            </Tooltip>
        );
    };

    const hasAccess = (type) => permissions.some(p => p.access === type);

    const handleAdd = async () => {
        if (!hasAccess('create')) return;
        await api.post('/comment/comments/', { page: pageName, text, user: userId });
        setText('');
        fetchComments();
    };

    const handleEdit = async (comment) => {
        const newText = prompt('Edit comment', comment.text);
        if (newText && hasAccess('edit')) {
            await api.put(`/comment/comments/${comment.id}/`, { ...comment, text: newText });
            fetchComments();
        }
    };

    const handleDelete = async (id) => {
        if (hasAccess('delete')) {
            await api.delete(`/comment/comments/${id}/`);
            fetchComments();
        }
    };

    return (
        <div className="container mt-4">
            <h2>{pageName.replace(/_/g, ' ')}</h2>
            <div className="my-3">
                {hasAccess('create') && (
                    <>
                        <textarea className="form-control" value={text} onChange={e => setText(e.target.value)} />
                        <button className="btn btn-primary mt-2" onClick={handleAdd}>Add Comment</button>
                    </>
                )}
            </div>
            <ul className="list-group">
                {comments.map(comment => (
                    <li key={comment.id} className="list-group-item">
                        <OverlayTrigger placement="top" overlay={getHistoryTooltip(comment.id)}>
                            <div>{comment.text}</div>
                        </OverlayTrigger>
                        <small className="text-muted">By User ID: {comment.user}</small>
                        <div>
                            {hasAccess('edit') && <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(comment)}>Edit</button>}
                            {hasAccess('delete') && <button className="btn btn-sm btn-danger" onClick={() => handleDelete(comment.id)}>Delete</button>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DynamicPage;