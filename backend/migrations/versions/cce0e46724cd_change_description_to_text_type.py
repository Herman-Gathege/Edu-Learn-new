"""Change description to Text type

Revision ID: cce0e46724cd
Revises: b28a540c650b
Create Date: 2025-01-23 21:29:19.827011

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cce0e46724cd'
down_revision = 'b28a540c650b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('course', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=300),
               type_=sa.Text(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('course', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=300),
               existing_nullable=False)

    # ### end Alembic commands ###
